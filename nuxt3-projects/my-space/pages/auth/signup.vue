<template>
    <u-card class="md:min-w-96">
        <div class="text-2xl text-center font-bold mb-1">Signup</div>

        <div class="text-slate-500 text-sm text-center mb-4">
            Already have an account?

            <UButton variant="link" to="/auth/login">Login</UButton>
        </div>

        <UForm :schema="schema" :state="user" @submit="onSubmit">
            <UFormGroup label="Email" name="email" class="mb-4">
                <UInput v-model="user.email" icon="i-heroicons-at-symbol" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="user.password" type="password" icon="i-heroicons-lock-closed" />
            </UFormGroup>

            <UFormGroup label="Password Confirmation" name="passwordConfirm" class="mb-4">
                <UInput v-model="user.passwordConfirm" type="password" icon="i-heroicons-lock-closed" />
            </UFormGroup>

            <UButton type="submit" block class="mt-8" :loading="loading">
                Signup
            </UButton>
        </UForm>
    </u-card>
</template>

<script setup>
import Joi from 'joi'

definePageMeta({ layout: 'auth' })

const supabase = useSupabaseClient(),
      loading = ref(false),
      toast = useToast()

const user = ref({
    email: '',
    password: '',
    passwordConfirm: ''
})
const schema = Joi.object({
    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().min(6).required(),
    passwordConfirm: Joi.valid(Joi.ref('password'))
                        .label('Confirm password')
                        .messages({ 'any.only': `passwords don't match` })
})

const onSubmit = async () => {
    loading.value = true
    try {
        const { error } = await supabase.auth.signUp({
            email: user.value.email,
            password: user.value.password
        })
        if (error) throw error
        toast.add({ title: 'Welcome!' })
        navigateTo('/')
    } catch(error) {
        toast.add({ title: error.message, color: 'red' })
    }
    loading.value = false
}
</script>
