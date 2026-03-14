<script lang="ts">
import { onMount } from 'svelte';
import { getFont, setFont } from '@utils/setting-utils';
import type { FontMode } from '@utils/setting-utils';

let currentFont = $state<FontMode>('default');

onMount(() => {
    currentFont = getFont();
});

function toggle() {
    const next: FontMode = currentFont === 'default' ? 'xiaolai' : 'default';
    currentFont = next;
    setFont(next);
}
</script>

<button
    aria-label="切换字体风格"
    class="btn-plain scale-animation rounded-lg h-11 px-3 font-bold active:scale-90 text-sm"
    onclick={toggle}
>
    {currentFont === 'default' ? '正常字体' : '手写字体'}
</button>
