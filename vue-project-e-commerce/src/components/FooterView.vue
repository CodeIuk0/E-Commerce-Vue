

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'



// Pour faire des messageBox, pour les
const MessageBoxA = (title:string,message:string,type_:string="warning") => {
  ElMessageBox.confirm(
    message,
    title,    <any>{
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: type_,
      draggable: true,
      dangerouslyUseHTMLString: true,

    }).then(() => {
      ElMessage({
        type: 'success',
        message: 'Ok  !',
        duration:1500
      })
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: 'Canceled !',
        duration:1500
      })
    })
}

const Apropos: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget blandit metus, ac fringilla nisl. Nam ultrices, nulla vitae aliquam convallis, nulla magna viverra tellus, et tempor diam dolor vitae lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla diam dolor, bibendum sit amet eleifend a, blandit interdum ligula. Mauris sit amet tempus dolor, at sagittis massa. Proin quis imperdiet erat, eget aliquam ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus eu risus eu lacus suscipit ultricies ut semper diam. Integer sed auctor risus, ut venenatis orci. Aliquam scelerisque mauris non interdum iaculis. Fusce eget mattis purus, ac egestas augue. Mauris lectus ante, bibendum eu ullamcorper nec, bibendum ut magna. Donec tempor justo nec orci volutpat, ut gravida libero ornare.

Etiam sagittis varius lorem vel viverra. Sed gravida placerat leo quis laoreet. Ut dignissim, lectus non mattis pellentesque, tellus tortor ultrices dolor, vitae sodales nisl magna nec felis. Sed eu condimentum elit. Aliquam erat volutpat. Nulla ultricies ex nisl, quis vulputate justo faucibus ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Donec ut fringilla justo. Nam eu ligula vel lectus commodo eleifend. Nullam metus orci, aliquam nec mattis a, sagittis nec sem. Nulla sit amet cursus elit. Pellentesque et convallis nunc. Fusce sed sodales ante. Fusce sit amet velit fermentum, euismod mi id, venenatis nunc.

Aenean ipsum enim, viverra a tempus at, molestie non ligula. Vestibulum fringilla quam nulla, nec malesuada velit ullamcorper sed. Suspendisse in mi non enim sodales consectetur eget vitae elit. Integer vel eros sed sapien lobortis lobortis. Integer sed egestas nulla. Proin pharetra mollis orci eget feugiat. Proin quis justo vel dui euismod fringilla. Fusce quis euismod enim. Nam mattis turpis metus, in molestie diam egestas vitae. Donec finibus eget lacus eu finibus.`

</script>




<template>
  <el-footer style="width: 100%;" id="Footer" >
    <RouterLink to="/" name="title" >BoostShop</RouterLink>
    <div id="footer-container">

      <el-container>
        <span point>• </span><el-button @click="()=>MessageBoxA('À propos',Apropos)">À propos</el-button> 
        <br>
        <span point>• </span><RouterLink to="NosRelation">Nos relations</RouterLink>
        <br>
        <span point>• </span><el-button @click="()=>MessageBoxA('Phone','00.00.00.00.00')">Nous contacter</el-button>
      </el-container>

      <el-container>
        <span point>• </span><RouterLink to="/">Nos Produits</RouterLink>
        <br>
        <span point>• </span><RouterLink to="CodePromo">Nos code cadeau</RouterLink>
        <br>
        <span point>• </span><RouterLink to="MyMarket">Votre panier</RouterLink>
      </el-container>

      <el-container>
        <span point>• </span><RouterLink to="Livraison">Livraison</RouterLink>
        <br>
        <span point>• </span><RouterLink to="Twitter">Twitter</RouterLink>
        <br>
        <span point>• </span><RouterLink to="LinkedIn">LinkedIn</RouterLink>
      </el-container>

    </div>

  </el-footer>

</template>


<style scoped>
.el-container
{
  flex-wrap: wrap;
  overflow-wrap:break-word;
  height: 100%;
  display: block;
  width: 160px;
  max-width: 160px;
}

#footer-container
{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: self-start;
}

.el-container > span, .el-container > a,.el-container > button
{
  line-height: 60px;
  font-size: 1.1em;
  cursor: pointer;
  user-select: none;
  color:#012a53;
  outline: none;
  background:none;
  border:none;
  text-decoration: none;
}

.el-container > button
{
  height: 25px;
  margin: 0 0px 6px -1px;
  border:none;
  border-radius:0;
  padding:0;
}

.el-footer h1
{
  min-width: 250px;
  max-width: 250px;
  margin-left: 25px;
}

.el-container > a:hover,.el-container > button:hover
{
  border-bottom:  1px solid #012a53
}

</style>
