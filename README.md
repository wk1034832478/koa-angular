# Koa

# 优化措施
1.  将服务从应用级分散到模块级，不需要的模块不适用必须要加载的服务！
    也就是更改
    @Injectable({
        providedIn: 'root'
    })
    为：
    @Injectable({
        providedIn: ModuleName
    })
2. 继续细分模块，将首次没有必要加载的模块化成单独的模块，加速并方便以后进行扩展
3. 抽取公共模块
4. 去除不需要的模块，比如：浏览器动画模块 
5. 服务器启动压缩程序

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
