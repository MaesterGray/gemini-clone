<script lang="ts">
    import { Menu } from 'lucide-svelte';
    import { Plus } from 'lucide-svelte'; 
    import { MessageSquare } from 'lucide-svelte';
    import { CircleHelp } from 'lucide-svelte';
    import { Clock } from 'lucide-svelte';
    import { Settings } from 'lucide-svelte';

    let {recent,action,reset}:{recent:string[],action:(prompt:string)=>void,reset:()=>void} = $props()
    let open = $state(false)
    let bottomItems =['Help','Activity','Settings']
    </script>
    
    {#snippet BottomItem(item)}
    <div class="  sm:pr-10 cursor-pointer w-[20px] flex items-start gap-[10px] p-[10px]  rounded-[50px] text-[#282828]  hover:bg-[#e2e6eb] ">
        {#if item === 'Help'}
        <div class=" w-[20px]"><CircleHelp color='black'/></div>
        {#if open}
        <p>Help</p> 
        {/if}
        
        {:else if item === 'Activity'}
        <div class=" w-[20px]"><Clock/></div>
        {#if open}
        <p>Activity</p>
        {/if}
        {:else}
        <div class=" w-[20px]"><Settings/></div>
        {#if open}
          <p>Settings</p>
          {/if}
        {/if}
      
        </div>
    {/snippet}

    <div class="hidden sidebar min-h-screen sm:inline-flex flex-col justify-between bg-[#f0f4f9] py-[25px] px-[15px] ">
        <div class=" top ">
            <div class=" ml-[10px] cursor-pointer block"  onclick={()=> open = !open}>
                <div class=" w-[20px]"><Menu/></div> 
             </div>
             <div class=" new-chat mt-[10px] inline-flex items-center gap-[10px] bg-[#e6eaf1] rounded-[50px] py-[10px] px-[15px] text-[14px] text-gray-400">
                 <div class=" w-[20px] flex items-center"><Plus color='black'/></div>
                {#if open}
                <p class=' text-lg cursor-pointer' onclick={reset}>New chat</p>
                {/if}
             </div>
             {#if open}
             <div class=" recent flex flex-col ">
                 <p class=" recent-title mt-[30px] mb-[20px]">Recent</p>
                 {#each recent as recentPrompt}
                 <div class=" recent-entry flex items-start gap-[10px] p-[10px] pr-[40px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]" onclick={()=>action(recentPrompt)}>
                    <div class=" w-[20px]"><MessageSquare/></div>
                    <p>{recentPrompt.slice(0,18)}...</p>
                </div>
                 {/each}
                 
             </div>
             {/if}
        </div>
     
        
        <div class=" bottom flex flex-col">
            {#each bottomItems as item}
                {@render BottomItem(item)}
            {/each}
        </div>
    </div>