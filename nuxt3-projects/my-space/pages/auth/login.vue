<template>
    <u-card class="md:min-w-96">
        <div class="text-2xl text-center font-bold mb-1">
            Login
        </div>
        <div class="text-slate-500 text-sm text-center mb-4">
            Don't have an account?
            <UButton variant="link" to="/auth/signup">Create one</UButton>
        </div>
        <UForm :schema="schema" :state="user" @submit="onSubmit">
            <UFormGroup label="Email" name="email" class="mb-4">
                <UInput v-model="user.email" icon="i-heroicons-at-symbol" />
            </UFormGroup>
            <UFormGroup label="Password" name="password">
                <UInput v-model="user.password" type="password" icon="i-heroicons-lock-closed" />
            </UFormGroup>
            <UButton type="submit" block class="mt-8">
                Login
            </UButton>
        </UForm>
    </u-card>
</template>

<script setup>
import Joi from 'joi'

definePageMeta({ layout: 'auth' })

const user = ref({
    email: '',
    password: ''
})
const schema = Joi.object({
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().min(6).required()
})

const onSubmit = async () => {
    loading.value = true
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: user.value.email,
            password: user.value.password
        })
        if (error) throw error

        toast.add({ title: 'Logged in successfully!' })
        navigateTo('/')
    } catch(error) {
        toast.add({ title: error.message, color: 'red' })
    }
}
</script>
