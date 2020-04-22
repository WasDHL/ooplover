import React, { Component } from 'react';

export default class SLAHome extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                SLA Monitor

                <div>测试页面</div>
                <div>面向对象 爱好者</div>
                <div>作者: Harry</div>
                <div><span onClick={this.props.expand}>面向对象(Object Oriented,OO)</span>是 <b>软件开发方法</b>。面向对象的概念和应用已超越了程序设计和软件开发，扩展到如数据库系统、交互式界面、应用结构、应用平台、分布式系统、网络管理结构、CAD技术、人工智能等领域。面向对象是一种对<b>现实世界理解和抽象的方法</b>，是计算机编程技术 [1]  发展到一定阶段后的产物。<span>（ -- 来自百度百科 ）</span></div>
                <div>
                ##### Tips
软件开发方法： 
首先， 面向对象是一种开发方法， 换句话说， 是一种开发的思维方式， 然而 早些时候， 关于面向对象的定义， 或者说教材， 都不会先从这个方面入手。 比如， 我们常听说， C 是一门面向过程的语言，  C++ 是一门面向对象并且面向过程的语言， C#， Java... 等是一门面向对象的语言。 所以， 对于面向对象概念的入手会以某种特定类型的语言为切入点。 
下一个标准面线对象的语言是个什么样子的存在。
            典型场景： 
            <div>
1.	表单Controller
表单功能或者页面一般涉及到 新建 查看 编辑 ， 一方面，页面布局十分类似， 另一方面， 页面功能也有很多相同的部分， 比如：
a.	针对的是相同的表单条目。
b.	新建和编辑针对每个条目的操作都是一样的， 都有确认提交操作
c.	编辑和查看都需要事先获取初始数据
当然也有不同的部分：
a.	新建和编辑提交的数据内容可能有差异， 比如编辑时候需要带上当前ID， 而且提交Api的方式（地址，请求方法）也可能不同
b.	新建没有获取初始数据的流程， 查看没有编辑或提交的操作

所以，构建思路大致如下
创建基类: FormController
定义好基础功能， 比如 “数据格式定义”， “数据初始化”， “编辑提交操作”
创建三个子类继承自基类
CreateFormController: 定制数据初始化功能：返回空数据； 定制编辑提交的Api方法
EditFormController: 定制数据初始化功能，从Api获取初始数据； 定制编辑提交的Api方法
ViewFormController: 定制数据初始化功能，从Api获取初始数据； 定制ReadOnly页面。
</div>
<div>
2.	Service
目前项目里面Service多数用在封装Api请求， 但即便只是封装Api请求也是可以抽象出基类的。
目前Api请求大致包括：
分页列表： GET /特定内容/page?pageIndex=&pageSize=&
全量列表： GET /特定内容/list
新建： POST /特定内容/create
编辑： POST /特定内容/edit
删除： POST /特定内容/remove

上面的特定内容就是可定制的功能。
</div>

<div>
3.	复杂Service功能， 如 TreeService
处理复杂类型的数据结构逻辑时， 可以抽象出基础的交互逻辑， 在通过继承的方式逐步 扩展基础类的功能， 做到 结构清晰， 并且功能全面。
</div>
                </div>
            </div>
        )
    }
}