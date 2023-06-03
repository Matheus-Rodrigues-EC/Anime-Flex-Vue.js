<script >
export default {
    name: 'Header',
    data() {
        return {
        }
    }
}
</script>

<template>
    <div class="header">
        <a>Home</a>
        <div class="account">
            <a>Entrar</a>
            <a>Cadastrar-se</a> 
        </div>
    </div>
</template>

<style>

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
}

input{
    width: 250px;
    height: 25px;
    padding-left: 15px;
    border: none;
    border-radius: 15px;
    box-sizing: border-box;
}

.account {
    display: flex;
    gap: 15px;
}

</style>