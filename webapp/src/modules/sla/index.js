import React, { Component } from 'react';

export default class SLAHome extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <div className="swiper-img"></div>
                <div className="test-info">
                  <div className="title">SLA Monitor 测试页</div>
                  <div><span onClick={this.props.expand}>面向对象(Object Oriented,OO)</span>是 <b>软件开发方法</b>。首先定义一个对象a，有一个属性x，值为1。接着让b = a，这一步的结果就是a和b指向了同一个对象。在内存中，对象的存储和基本数据类型不同。基本数据类型直接保存在栈里，a = 1，b = 1，在栈里会保存两份1，分别赋值给a和b。修改a或b，对另一个变量不会有什么影响。对象则不然，变量a和b如果被赋值对象，a和b实际上保存的只是对象的地址，而且a和b还是被存储在栈里，同时a和b的地址是相同的。但对象是在堆里保存，且只保存一份，对象的地址就是a和b的值，a和b都指向同一个对象。这与C里面的指针类似，修改指向同一个对象的任何一个变量，与之引用同一对象变量很快就会发生同样的变化。所以现在的情况就是，a和b都指向了堆中的一个对象，这个对象的属性x值是1。那么a.x = 1，b.x自然也等于1。接下来发生一件事情，a修改了对象的x属性为2，这个变化反映到了堆中：
看，a和b还是指向了同一个对象，只不过对象中的x属性值变成了2。这一变化b很快就发现了，所以你再去访问b.x，实际上就是访问堆中的对象的x属性，也就是2。再后来，为a赋值了一个新的对象，虽然它也有一个属性x，但它确实是一个新对象！那么内存堆中发生了什么呢？首先，堆中原有的对象（x = 2的那个）还在那里。因为新建了一个对象（x = 3的），堆中就会出现一个新的对象，与原来的对象毫无关系。同时，b并没有变化，它还指向原有的对象（x = 2），但a指向原来的对象的地址却发生了变化，它指向了x = 3的这个新对象。a的地址变了，同时a和原来的对象也没有指向关系了，它指向了新的对象，这个新对象的x = 3。而b对象没有任何变化，它还坚守着自己的对象，对象的x属性是2。</div>
                  <div className="question">
                     <div>对象是怎么样定义的,属性是怎么定义的?</div>
                     <div>可以用function定义一个对象,然后根据形参在里面this.x=x可以定义属性,或者可以通过动态的添加一个属性。</div>
                  </div>
                  <div className="question">
                     <div>讲几个常见的js内置对象,他们有什么好处?</div>
                     <div>Object,Array,String,Number,Boolean,Date,Function可以方便的使用一些方法和常量,譬如String里面就有很多字符串函数 Date可以处理时间。</div>
                  </div>
                  <div className="question">
                     <div>prototype(原型)是什么,它是怎么使用的?</div>
                     <div>每个函数都有一个prototype属性, 它是一个引用变量, 默认指向一个空Object对象 ,有备用的意思,当调用一个对象的函数或者属性的时候,如果在当前对象里面找不到,那么就到原型里面去找。</div>
                  </div>
                  <div className="question">
                     <div>js是怎么样实现继承的?</div>
                     <div>使用prototype属性就可以实现继承 一般是child.prototype=new parent()就可以实现。</div>
                  </div>
                </div>
           </div>
        )
    }
}
