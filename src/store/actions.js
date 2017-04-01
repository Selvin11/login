import * as types from './mutation-types'

const actions = {
  // actions中的函数接受一个与store实例有相同属性和方法的context对像
  // 因此可以调用context中包含的state,getters以及mutations中定义的方法
  // userLogin(context){
  //   context.commit(types.LOGIN);
  // }
  // 使用es6的函数参数结构简化代码，可以直接将context.commit => commit使用
  // 在.vue文件中通过store.dispatch('userLogin') 即可触发状态改变了
  // 这里的data是因为提交mutations时需要获取从/api/login传回的user对象
  userLogin({
    commit
  }, data) {
    commit(types.LOGIN, data);
  },
  delUserSession({
    commit
  }, data) {
    commit(types.DELSESSION, data);
  },
  userLoginOut({
    commit
  }) {
    commit(types.LOGINOUT);
  }
}

export default actions