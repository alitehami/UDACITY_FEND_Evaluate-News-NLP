//ref to resolve issue with async functions testing with jest & babel
//error: "ReferenceError: regeneratorRuntime is not defined"
//https://github.com/babel/babel/issues/9849
//https://stackoverflow.com/questions/42535270/regeneratorruntime-is-not-defined-when-running-jest-test
// const regeneratorRuntime = require("regenerator-runtime");
import 'regenerator-runtime/runtime'