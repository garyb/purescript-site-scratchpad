# Differences from Haskell

## Evaluation strategy

Unlike Haskell, PureScript is strictly evaluated.

As the evaluation strategy matches JavaScript, interoperability with existing code is trivial - a function exported from a PureScript module behaves exactly like any "normal" JavaScript function, and correspondingly, calling JavaScript via the FFI is simple too.

Keeping strict evaluation also means there is no need for a runtime system or overly complicated JavaScript output. It should also be possible to write higher performance code when needed, as introducing laziness on top of JavaScript comes with an unavoidable overhead.

## Types

### Explicit forall

Polymorphic functions in PureScript require an explicit `forall` to declare type variables before using them. For example, Haskell's list `length` function is declared like this:

``` haskell
length :: [a] -> Int
```

In PureScript this will fail with the error `Type variable a is undefined`. The PureScript equivalent is:

``` haskell
length :: forall a. [a] -> Number
```

A `forall` can declare multiple type variables at once, and should appear before typeclass constraints:

``` haskell
ap :: forall m a b. (Monad m) => m (a -> b) -> m a -> m b
```

### Numbers

There is only a single native `Number` type which represents JavaScript's standard IEEE 754 float.

### Unit

PureScript has a type `Unit` used in place of Haskell's `()`. The `Prelude` module provides a value `unit` that inhabits this type.

## IO vs Eff

Haskell uses the `IO` monad to deal with side effects, in PureScript there is a monad called `Eff` that serves the same purpose but can track side effects with more granularity. For example, in a Haskell program the type signature of `main` will be:

``` haskell
main :: IO ()
```

This doesn't tell us much specifically about what `main` might do. In PureScript the type may be something like this:

``` haskell
main :: forall e. Eff (fs :: FS, trace :: Trace, process :: Process | e) Unit
```

Now we can see from the type that `main` uses the file system, traces messages to the console, and does something to the current process.

For more details about using Eff, how it works, and how to define your own side effects, [see this post](http://www.purescript.org/posts/Eff-Monad).

## Records

- Objects
- Dctor with object /= haskell record

## Typeclasses

- "Implies" arrow
- Named instances requirement, but still no overlaps/instance choice
- No default member implementations
- ? Semigroupoids based hierarchy

## Tuples

PureScript has no special syntax for tuples as records can fulfill the same role that *n*-tuples do with the advantage of having more meaningful types and accessors.

A `Tuple` type for 2-tuples is available via the [purescript-tuples](https://github.com/purescript/purescript-tuples) library. `Tuple` is treated the same as any other type or data constructor.

## Composition operator

PureScript uses `<<<` rather than `.` for right-to-left composition of functions. This is to avoid a syntactic ambiguity with `.` being used for property access and name qualification. There is also a corresponding `>>>` operator for left-to-right composition.

The `<<<` operator is actually a more general morphism composition operator that applies to semigroupoids and categories, and the `Prelude` module provides a `Semigroupoid` instance for the `->` type, which gives us function composition.

## Missing things

- Array comprehensions
- ? Inferred constraints
- ? No special treatment of ($)
- ? Partial application of operators
- ? Multiple guard clauses
