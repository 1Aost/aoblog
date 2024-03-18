## aoblog个人博客
1. npm install
2. npm run start 运行
3. npm run build 打包

### 迁移至rsbuild

#### 和 webpack 的区别
Webpack 是目前最为成熟的构建工具，有着活跃的生态，灵活的配置和丰富的功能，但是其最为人诟病的是其性能问题，尤其在一些大型项目上，构建花费的时间可能会达到几分钟甚至几十分钟，性能问题是目前 webpack 最大的短板。因此 Rspack 解决的问题核心就是 Webpack 的性能问题。 Rspack 比 Webpack 快得益于如下几方面：

1. Rust 语言优势: Rspack 使用 Rust 语言编写， 得益于 Rust 的高性能编译器支持， Rust 编译生成的 Native Code 通常比 JavaScript 性能更为高效。
2. 高度并行的架构: Webpack 受限于 JavaScript 对多线程的羸弱支持，导致其很难进行高度的并行化计算，而得益于 Rust 语言的并行化的良好支持， Rspack 采用了高度并行化的架构，如模块图生成，代码生成等阶段，都是采用多线程并行执行，这使得其编译性能随着 CPU 核心数的增长而增长，充分挖掘 CPU 的多核优势。
3. 内置大部分的功能: 事实上 Webpack 本身的性能足够高效，但是因为 webpack 本身内置了较少的功能，这使得我们在使用 Webpack 做现代 Web App 开发时，通常需要配合很多的 plugin 和 loader 进行使用，而这些 loader 和 plugin 往往是性能的瓶颈，而 Rspack 虽然支持 loader 和 plugin，但是保证绝大部分常用功能都内置在 Rspack 内，从而减小 JS plugin | loader 导致的低性能和通信开销问题。
4. 增量编译: 尽管 Rspack 的全量编译足够高效，但是当项目庞大时，全量的编译仍然难以满足 HMR 的性能要求，因此在 HMR 阶段，我们采用的是更为高效的增量编译策略，从而保证，无论你的项目多大，其 HMR 的开销总是控制在合理范围内。