<script >
export default {
    name: 'Navbar'
}
</script>

<template>
    <div class="header">
        <router-link to="/">Home</router-link>
        <div class="account">
            <router-link to="/signin">Entrar</router-link>
            <router-link to="/signup">Cadastrar-se</router-link> 
        </div>
    </div>
</template>

<style scoped>

.header {
    display: flex;
    width: 100%;
    height: 70px;
    background-color: #454545;
    position: fixed;
    top: 0;
    left: 0;
    gap: 15px;
    justify-content: space-evenly;
    align-items: center;
    z-index: 9;
}



.account {
    display: flex;
    gap: 15px;
}

router-link{
    cursor: pointer;
}

</style>