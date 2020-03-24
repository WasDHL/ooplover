const InitialState = {
    userInfo: null,
    diaryList: [

        { id: 10009, title: '王豆包子的爸爸借王豆包子的地方写一点东西', date: '2018-10-20', content: 'CSS3 transform rotate 要起作用， 前提是 这个元素需要是 position; absolute;' },
        { id: 10008, title: '王豆包子的爸爸借王豆包子的地方写一点东西', date: '2018-10-19', content: 'Flex 布局是好， 但也会造成一些不可预见的问题， 比如说， Flex定义为弹性自适应， 如果某一个元素的尺寸在设计的时候需要按照子元素的尺寸自适应， 那这样的元素在 flex 布局内就需要慎重排布。' },
        { id: 10007, title: '王豆包子的爸爸借王豆包子的地方写一点东西', date: '2018-10-16', content: `最近一直在考虑一个问题。 关于全局状态管理的。
        我们知道， 状态管理定位于数据层， 对应 MVC 中的 M， 在项目架构中属于横向拆分出来的模块(所以叫层嘛)。
        状态管理的有点不言而喻， 我一向就觉得有了全局状态管理的介入， 至少， 不用考虑各种组件之间的数据传递了， 每个组件都能各自做好各自的事情。

        然而也正是在设计组件的时候， 遇到了一个相对矛盾的问题。
        理想情况下， 组件的设计为了实现某个通用化的逻辑包装， 包括View， Method等。
        那View举例， 一个 Component 需要接管界面的布局渲染， 以及最重要的“交互”，
        如果涉及到交互， 那必然带来所谓的状态的变化， 那么， 问题来了， 这部分的状态变化到底该由组件自己去包装， 还是交由数据层中的状态管理去维护呢 ？

        举个最直接的例子，
        一个Select组件的实现，
        props 中接收一个属性 selectedIdx 标志初始化选中的下标值，
        render 组件是会根据这个 selectedIdx 来渲染子元素的选中状态。

        那么， 当用户选择了这个组件的其他元素时， 接下去的交互逻辑就产生分歧了，

        根据全局数据管理的思路，
            Select 组件触发 onChange 事件，
            onChange 事件从connect的props方法中dispatch一个action去触发全局 store 的变化，
            state发生变化， 触发组件的重新渲染，
            Select接收到一个新的 selectedIdx， 渲染一个新的选中状态。
            是的， 这个就是我理解的 所谓的 单向绑定的逻辑...
            然而问题是，在这种流程下 Select组件存在的意义是否太过单薄，
            自己组件内部的交互， 需要依赖全局的数据变化， 每次的 propsChange 都要去触发整个组件的重新渲染，
            这样一个 Select 组件如果脱离了 store 层， 那就毫无用处， 所以， 这个一个组件该有的自我修养吗 ？
        组件内部独立State的思路，
            props 中接收一个属性 selectedIdx 标志初始化选中的下标值，
            将 selectedIdx 存为组件内部的 state，
            render 组件根据组件内维护的 state.selectedIdx 渲染子元素的选中状态，
            用户选择了这个组件的其他元素时， state.selectedIdx 更新， 组件触发 setState 改变组件自身状态。
            所以现在的问题是， 组件自己包装好了界面交互， 包装好了内部state变化， 可什么时候去通知 全局 store 呢 ？
            大多数情况下， 用户的操作行为需要及时的变化响应， 所以， 一旦组件内部的state发生变化， 必然需要及时通知 数据层结构 去做相应的状态更新。
            原本关联组件的属性 props.selectedIdx 必然还是发生了变化， 组件必然还是需要提供响应。
            于是， 可以看到， 内部 state 的方案其实是一个 双向绑定的 思路。
            于是， 关键的问题就是， 当 props.selectedIdx 变化时， 双向绑定的 Component 该如何去响应 ？
            于是， 不可避免的， 需要用到 componentWillReceiveProps 或者 componentShouldUpdate 之类的 生命周期函数 去 管理 渲染的时机。
            看上去， 怎么都觉得不够优雅了， 但又有什么办法呢... ？

        所以， 其实很多概念也都只是概念而已， 比如
            无状态组件， 纯函数组件， 组件真的可以没有状态吗， 必然不行， 组件丢掉状态， 其实只是把状态转嫁到其他层次而已，
            而且， 并不是所有应用场景下都适合去转嫁本该自己管理的状态...

        又或者说，
            状态管理是一个横向切分项目模块的产物，
            而组件的设计开发是一个纵向的应用逻辑包装， 相互弥补， 又相互制约...
            想要做到优雅的构建应用结构， 还是需要非常清晰的切分思维。

        BTW： 组件设计的第一要务是分治， 而不是复用... ！

        补充一些思考：
        组件内部独立State的思路下， 如果 render 函数中根本没有关联 props.selectedIdx， 是不是说， 不管外部传入的 props.selectedIdx 不管怎么变化， 都不会重新渲染组件的DOM结构呢，
        这 貌似 听上去 很有可能 就是 这样的啊... 那岂不是， 我又打了自己的脸 ？
        呃...

        再补充一些思考：
        外部传入的 props.selectedIdx 发生变化， 还是需要及时作出响应的， 万一 这个变化并不是由 组件内部发起的呢 ？ 数据的状态变化来源很可能不只一个， 别的组件发起 action 改变了这个 selectedIdx，
        那就必然要更新当前组件的状态了， componentWillReceiveProps 之类的方法仍然是需要配置的。
` },
        { id: 10006, title: '王豆包子的爸爸借王豆包子的地方写一点东西', date: '2018-10-9', content: '关于项目所用第三方库跟随迭代版本的问题， 我一直比较质疑项目的第三方库及时更新版本的必要性， 原因无非就是第三方库始终是别人的东西， 版本的迭代必然会产生不可预见的影响， 这对于一个稳定运行的项目来说， 无异于自己给自己制造问题... 第三方框架或库的提供方迭代版本无非是1.修复Bug，2.提供新功能，3.摒弃一些旧的不合理的api。 针对第一钟情况， 如果上一版本存在某些Bug导致项目出现问题， 第一解决方案难道不是尝试绕过当前版本的Bug吗， 都要去依赖库的版本更新， 那就太被动了。 针对第二种情况， 试想以下， 目前旧版本的库所提供的功能能不能覆盖当前项目的开发， 如果不能覆盖， 当年为什么要选择这样的一个库去使用， 难道就认准了将来这个库会更新出你想要的定制的功能吗？ 所以，新功能对于一个现有的项目来说又有多大的现实意义呢？ 针对第三个， 我就不用说了。 今天 阿里的一个哥们这么跟我讲： 难道你不为团队的技术成长考虑吗？ 难道你不为将来维护代码的弟兄们考虑吗 ？' },
        { id: 10005, title: '王豆包子的爸爸借王豆包子的地方写一点东西', date: '2018-10-9', content: '设计组件的第一要务不是复用， 而是分治， 某一个面试官说了 “组件有什么了不起， 谁都能做”， 是呀， 他说的对！' },
        { id: 10004, title: '王豆包子的爸爸借王豆包子的地方写一点东西', date: '2018-10-8', content: 'Redux-thunk 提供的dispatch方法执行返回一个Promise对象！' },
        { id: 10003, title: '王豆包子的爸爸借王豆包子的地方写一点东西', date: '2018-10-8', content: '关于箭头函数， 箭头函数不仅改变上下文this， 还会顺应的把函数定义是上下文函数的argments注进箭头函数中去。 故而 慎用 ！！' },
        { id: 10002, title: '王豆包子的嫉妒', date: '2018-10-4', content: '今天的豆包子表现出了对她娘亲的极大的占有欲， 妈妈抱着安安妹妹的时候， 豆包子的表情已可见的速度从愤怒变成委屈， 瘪起的小嘴， 快要决堤的眼泪， 着实让人心疼。' },
        { id: 10001, title: '', date: '2018-10-2', content: '今天回去看王豆包子了。' }
    ],
    diaryDetail: null
};

export default function (state = InitialState, action) {
    switch (action.type) {
        case 'FETCHED_USERINFO':
            return Object.assign({}, state, { userInfo: action.userInfo }); //InitialState
        case 'FETCHED_DIARYLIST':
            return Object.assign({}, state, { diaryList: action.diaryList });
        case 'FETCHED_DIARYDETAIL':
            return Object.assign({}, state, { diaryDetail: action.diaryDetail });
        default:
            return state;
    }
}


function diff (dom1, dom2) {
	if (dom1.data != dom2.data) {
		return false;
	} else if (dom1.children.length !== dom2.children.length) {
        return false;
	} else {
        var result = true;
        for (var i = 0; i < dom1.children.length; i++) {
            result = result && diff(dom1.children[i], dom2.children[i]);
            if (!result) {
                return false;
            }
        }
        return result;
    }
    return true;
}
