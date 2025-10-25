import * as core from '@actions/core'
import * as github from '@actions/github'
import axios from 'axios'

function getEventName(): string {
  const ctx: any = (github as any).context as any
  return ctx.eventName || ctx.event_name || ''
}

async function run(): Promise<void> {
  try {
    // 获取输入参数
    const glmApiKey = core.getInput('glm_api_key', { required: true })
    const prompt = core.getInput('prompt') || extractPromptFromContext()
    const model = core.getInput('model') || 'glm-4'
    const maxTokens = parseInt(core.getInput('max_tokens')) || 2000
    const githubToken = core.getInput('github_token')

    core.info(`🤖 GLM Assistant starting with model: ${model}`)

    // 调用GLM API
    const response = await callGLMApi(glmApiKey, prompt, model, maxTokens)

    // 处理响应
    await handleResponse(response, githubToken)

    core.info('✅ GLM Assistant completed successfully')
  } catch (error) {
    core.setFailed(`❌ GLM Assistant failed: ${error}`)
  }
}

function extractPromptFromContext(): string {
  const context = github.context

  const eventName = getEventName()
  if (eventName === 'issue_comment' || eventName === 'pull_request_review_comment') {
    const commentBody = context.payload.comment?.body || ''

    // 检查是否包含@claude提及
    if (commentBody.includes('@claude')) {
      // 提取@claude之后的内容
      const claudeMention = commentBody.match(/@claude\s*(.+)/i)
      if (claudeMention && claudeMention[1]) {
        return claudeMention[1].trim()
      }
    }
  }

  return 'Please help with this repository.'
}

async function callGLMApi(
  apiKey: string,
  prompt: string,
  model: string,
  maxTokens: number
): Promise<string> {
  const url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }

  // 构建系统提示
  const systemPrompt = `你是一个智能代码助手，专门帮助开发者处理GitHub仓库相关的问题。

当前仓库信息：
- 仓库名: ${github.context.payload.repository?.full_name}
- 分支: ${github.context.ref}
- 提交者: ${github.context.actor}
- 事件类型: ${getEventName()}

请根据用户的请求提供帮助，包括但不限于：
- 代码审查和建议
- Bug修复和优化
- 功能实现建议
- 项目结构分析

请用中文回复，保持简洁明了。`

  const data = {
    model: model,
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: maxTokens,
    temperature: 0.7,
    stream: false
  }

  core.info(`🔍 Calling GLM API with prompt: ${prompt.substring(0, 100)}...`)

  try {
    const response = await axios.post(url, data, { headers })

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content
    } else {
      throw new Error('Invalid response format from GLM API')
    }
  } catch (error: any) {
    core.error(`GLM API Error: ${error.response?.data || error.message}`)
    throw error
  }
}

async function handleResponse(response: string, githubToken: string): Promise<void> {
  const context = github.context
  const octokit = github.getOctokit(githubToken)

  core.info(`📝 GLM Response: ${response.substring(0, 200)}...`)

  // 根据事件类型决定如何处理响应
  const eventName = getEventName()
  if (eventName === 'issue_comment') {
    await replyToIssueComment(octokit, response)
  } else if (eventName === 'pull_request_review_comment') {
    await replyToPRComment(octokit, response)
  } else if (eventName === 'pull_request') {
    await replyToPR(octokit, response)
  } else {
    // 对于其他事件类型，作为输出日志
    core.setOutput('response', response)
  }
}

async function replyToIssueComment(octokit: any, response: string): Promise<void> {
  const context = github.context
  const issueNumber = context.payload.issue?.number
  const commentId = context.payload.comment?.id

  if (issueNumber && commentId) {
    await octokit.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: issueNumber,
      body: `🤖 **GLM Assistant 回复**\n\n${response}`
    })

    core.info(`✅ Replied to issue #${issueNumber}`)
  }
}

async function replyToPRComment(octokit: any, response: string): Promise<void> {
  const context = github.context
  const pullNumber = context.payload.pull_request?.number
  const commentId = context.payload.comment?.id

  if (pullNumber) {
    await octokit.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullNumber,
      body: `🤖 **GLM Assistant 代码审查**\n\n${response}`
    })

    core.info(`✅ Replied to PR #${pullNumber}`)
  }
}

async function replyToPR(octokit: any, response: string): Promise<void> {
  const context = github.context
  const pullNumber = context.payload.pull_request?.number

  if (pullNumber) {
    await octokit.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullNumber,
      body: `🤖 **GLM Assistant 分析**\n\n${response}`
    })

    core.info(`✅ Replied to PR #${pullNumber}`)
  }
}

// 运行主函数
run()