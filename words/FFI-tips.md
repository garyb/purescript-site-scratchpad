# FFI tips

## Use `mkFn` and `runFn`

All functions in PureScript take exactly one argument, but when writing an interface to an existing JavaScript library often there is a need to expose multiple argument functions. One way to deal with this is to write some inline FFI code that "manually" curries a version of the function you want to bring in to PureScript:

``` haskell
foreign import joinPath
  "function joinPath(start) {
  \  return function(end) {\
  \    return require('path').join(start, end);
  \  };\
  \}" :: FilePath -> FilePath -> FilePath
```

This is quite tedious and error prone, so there's an alternative representation of function types, `Fn0` up to `Fn10` available from the module `Data.Function` (included with the compiler). Making use of these types allows us to greatly simplify the previous example:

``` haskell
foreign import joinPath
  "var joinPath = require('path').join;" :: Fn2 FilePath FilePath FilePath
```

However, these `Fn0`..`Fn10` types cannot be applied as normal PureScript functions, the require a corresponding `runFn0`..`runFn10` call to execute. The `runFn` definitions essentially do the work of taking a multi-argument function and returning a curried version for you.

Taking the previous example again, to avoid having to use `runFn2` every time we want to make use of `joinPath`, the usual way of doing this would be to suffix the foreign import with "Impl" and then define a more PureScript-friendly version that uses `runFn2`:

``` haskell
foreign import joinPathImpl
  "var joinPathImpl = require('path').join;" :: Fn2 FilePath FilePath FilePath

joinPath :: FilePath -> FilePath -> FilePath
joinPath = runFn2 joinPathImpl
```

The module would then hide the `joinPathImpl` export, only revealing our nice `joinPath` version.

Special support has been added to the compiler as of PureScript 0.5.4 to inline `runFn` calls when they are fully saturated (that is, applied with all the arguments at once), so it is recommended to avoid pointfree style when making definitions that use `runFn`. Taking the above example again:

``` haskell
joinPath :: FilePath -> FilePath -> FilePath
joinPath start end = runFn2 joinPathImpl start end
```

