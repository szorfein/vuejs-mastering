<template>
    <div class="min-h-screen bg-gray-100">
        <UContainer>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
                Post Information
            </h2>
            <UCard class="max-w-md mx-auto">
                <UForm class="space-y-6"
                       :schema="schema"
                       :state="post"
                       @submit="onSubmit"
                >
                    <UFormGroup label="Title" name="title">
                        <UInput type="text" v-model="post.title" />
                    </UFormGroup>

                    <UFormGroup label="Content" name="content">
                        <UTextarea type="text" v-model="post.content" :rows="8" />
                    </UFormGroup>

                    <UButton type="submit" block primary :loading="pending">
                        Save Changes
                    </UButton>
                </UForm>
            </UCard>

            <div class="flex justify-center mt-12">
                <UButton color="red"
                         variant="outline"
                         :loading="deleteLoading"
                         @click="deletePost"
                > Delete
                </UButton>
            </div>
        </UContainer>
    </div>
</template>

<script setup>
import Joi from 'joi'

const supabase = useSupabaseClient(),
      user = useSupabaseUser(),
      post = ref({
          title: '',
          content: undefined,
          author_id: user.value.id
      }),
      schema = Joi.object({
          author_id: Joi.string().required(),
          title: Joi.string().required(),
          content: Joi.string().allow('', null)
      }).unknown(true),
      deleteLoading = ref(false)

const route = useRoute(),
      postId = computed(() => route.params.id),
      editMode = computed(() => route.params.id !== 'create'),
      toast = useToast()

// edit or create new post
const onSubmit = async () => {
    pending.value = true
    try {
        const { error } = await supabase.from('posts')
                                        .upsert(post.value) // edit or create
        if (error) throw error

        if (!editMode.value) toast.add({ title: 'Post created successfully!' })
        else toast.add({ title: 'Post updated successfully!' })

        navigateTo('/')
    } catch(error) {
        toast.add({ title: error.message, color: 'red' })
    }
    pending.value = false
}

// fetch the data
const { pending } = useLazyAsyncData(async () => {
    if (!editMode.value) return

    const { data } = await supabase.from('posts')
                                   .select()
                                   .eq('id', postId.value)
                                   .single()

    if (data) post.value = data
})

const deletePost = async () => {
    deleteLoading.value = true
    try {
        const { error } = await supabase.from('posts')
                                        .delete()
                                        .eq('id', postId.value)
        if (error) throw error

        toast.add({ title: 'Post deleted successfully!' })
        navigateTo('/')
    } catch(error) {
        toast.add({ title: error.message, color: 'red' })
    }

    deleteLoading.value = false
}
</script>
