# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Following changes were made to make the code more readable & less error prone

Since the file has only one function I made it a default export which would lead to cleaner import statements.

I added comments to explain steps of the code and improve its readability.

Instead of multiple if statements I added a '?' check to make sure that event is not null or undefined before checking its properties.

I defined TRIVIAL_PARTITION_KEY & MAX_PARTITION_KEY_LENGTH making it clearer that it is a function-level constant.

I would further like to update the package.json to use import statements instead of require methods as they are much cleaner and easier to read
