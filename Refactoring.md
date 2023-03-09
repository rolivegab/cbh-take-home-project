# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I did a much better version than the original one.

The original version had a lot of mutability, which often makes things confusing.

Also, nested IFs make code hard to read and difficult to give maintenance.
A very good way to handle this type of problem is to apply "early-exit".
By returning earlier in the process, we make the code more clean and readable, removing nested blocks and breaking the logic into a sequence of steps.

I also removed these CONSTS and placed them at the end of the file. Nothing changes as they are not exported.
So it's better to have it outside of function implementation so the developer can focus on what is more important

Another improvement was extracting the hash-generation function to an external file, so we don't need to write it multiple times.