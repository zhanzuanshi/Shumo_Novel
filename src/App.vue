<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  @media screen and(min-width: 600px){
    padding: 0 2.5rem;
  }
}
</style>
