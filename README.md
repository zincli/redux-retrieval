# redux-retrieval

[![Travis](https://img.shields.io/travis/zincli/redux-retrieval.svg?style=flat-square)](https://travis-ci.org/zincli/redux-retrieval)
[![Codecov](https://img.shields.io/codecov/c/github/zincli/redux-retrieval.svg?style=flat-square)](https://codecov.io/gh/zincli/redux-retrieval)


reusable actions, reducers, selectors and sagas for retrieval application

`redux-retrieval` is a library that aims to make retrieval applications
(i.e. an order list page or a user management page)
developing easier,
inspired by
[react-router-redux](https://github.com/reactjs/react-router-redux),
[redux-saga](https://github.com/redux-saga/redux-saga)
and [redux-form](https://github.com/erikras/redux-form).


## Why `redux-retrieval`

`redux-retrieval` extracted the common pattern in retrieval applications as
reusable actions, reducers, selectors and sagas (impure things handler).
You could built your retrieval application by only composing these with some components and
writing a little code necessary. (For existed projects, it could remove some boilerplate code.)

// More explanations work in progress.

## Documents

* Beginner Tutorial
 - [中文](https://zincli.github.io/redux-retrieval/docs/zh/book/tutorial.html)


## Examples

These examples' codes could be found in [examples dir](./examples).

* [traditional list page](https://zincli.github.io/redux-retrieval/examples/traditional/)
