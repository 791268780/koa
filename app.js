const Koa = require('koa');
const app = new Koa();
const path = require('path');

app.listen(3000, ctx => {
	console.log( 'ok  3000' )
} );

const json = require('koa-json');  // 对象格式化
app.use( json() );

const KoaRouter = require('koa-router'); // 路由
const router = new KoaRouter();
app.use(router.routes()).use( router.allowedMethods() ) // 配置路由模块

const bodyParser = require('koa-bodyparser'); // 接受参数
router.use( bodyParser() );



const render = require('koa-ejs'); // 模板引擎
render(app, { // 模板引擎配置
	root: path.join( __dirname , 'views' ), // html 挂载目录
	layout: 'layout' , // 结构文件
	viewExt: 'html', // 文件后缀
	cache: false, // 缓存
	debug: false, // 调试
})


let arr = [ 1,2,3,4 ]
router.get('/', async ctx => { 
	await ctx.render('index', { // 监听页面  传递数据
		msg: '呵呵哒',
		arr: arr
	})
})

router.get('/add', async ctx => { 
	await ctx.render('add')
})



router.post('/adds' , async ctx => { 
	let body = ctx.request.body
	console.log(body.www)
	arr.push( body.www )
	ctx.redirect('/')  // 跳转
})

router.post('/remove' , async ctx => { 
	let body = ctx.request.body
	console.log( body.id )
	arr.splice( body.id , 1)
	ctx.body = { msg: 'ok' }
})


// app.use(async ctx => {
//   ctx.body = { msg: 'qwer' }
// });

