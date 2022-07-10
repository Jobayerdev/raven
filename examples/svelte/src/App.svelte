<script lang="ts">
	import { onMount } from 'svelte'
	import { Tossify } from 'tossify'
	import type { ITossifyResponse } from 'tossify/dist/types'
	const tossifyClient = new Tossify({
		baseURL: 'https://jsonplaceholder.typicode.com',
		enableLogger: true,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	let loading: boolean = false
	let posts: any[] = []
	const fetchPosts = async () => {
		loading = true
		try {
			const response: ITossifyResponse<{}> = await tossifyClient.get('/posts')
			posts = response?.data
		} catch (error) {
			console.log(error)
		} finally {
			loading = false
		}
	}
	const deletePost = async (id: number) => {
		loading = true
		try {
			await tossifyClient.delete(`/posts/${id}`)
			posts = posts.filter((post) => post.id !== id)
		} catch (error) {
		} finally {
			loading = false
		}
	}
	let title: string = ''
	let body: string = ''
	const onSubmit = async (e) => {
		e.preventDefault()
		loading = true
		try {
			const res = await tossifyClient.post('/posts', {
				title,
				id: posts.length + 1,
				body,
			})
			posts = [res?.data, ...posts]
		} catch (error) {
			console.log(error)
		} finally {
			loading = false
		}
	}
	onMount(async () => {
		await fetchPosts()
	})
</script>

<form on:submit={onSubmit}>
	<input type="text" bind:value={title} placeholder="Title" />
	<input type="text" bind:value={body} placeholder="body" />
	<button type="submit">Submit</button>
</form>
{#if loading}
	<h4 class="loading">loading...</h4>
{/if}
{#each posts as item}
	<div>
		<h1>{item.title}</h1>
		<p>{item.body}</p>
	</div>
	<button
		on:click={() => {
			deletePost(item.id)
		}}>Delete</button
	>
{/each}

<style>
	div {
		margin-top: 100px;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 1em;
		font-weight: 500;
	}
	.loading {
		position: fixed;
		top: 50px;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: 100%;
		z-index: 9999;
		display: flex;
		justify-content: center;
	}
</style>
