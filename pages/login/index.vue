<script setup lang="ts">
definePageMeta({
    middleware: 'login'
})

import '@/assets/css/login.less';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import TextInput from '@/components/TextInput.vue';

const nuxtApp = useNuxtApp();

const onSubmit = async (values) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            nuxtApp.$showToast('Login failed', 'Please check your credentials.', 'error');
            throw new Error('Login failed');
        }


        const data = await response.json();

        const tokenCookie = useCookie('auth_token', {
            maxAge: 60 * 60 * 24 * 365,
            sameSite: 'strict',
            secure: true
        });
        tokenCookie.value = data;

        if (process.client) {
            localStorage.setItem('auth_token', data);
            localStorage.setItem('user', JSON.stringify(data));
        }

        nuxtApp.$showToast('Login success', 'Welcome to homepage.', 'success');

        navigateTo('/');

    } catch (error) {
        console.error(error);
    }
};

const onInvalidSubmit = () => {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('invalid');
    setTimeout(() => {
        submitBtn.classList.remove('invalid');
    }, 1000);
}

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});
</script>

<template>
    <div class="login-form">
        <Form @submit="onSubmit" :validation-schema="schema" @invalid-submit="onInvalidSubmit">
            <TextInput name="email" value="alice.smith@example.com" type="email" label="E-mail" placeholder="Your email address"
                success-message="" />
            <TextInput name="password" value="password123" type="password" label="Password" placeholder="Your password"
                success-message="" />
            <button class="submit-btn button" type="submit">Login</button>
        </Form>
    </div>
</template>
