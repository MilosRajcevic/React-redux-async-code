# Two separate things in this file:

Reduces must me pure side-effect free and sync function. That mean we couldn't use async functions.

How to avoid async functions in reducers?

1. Fetch logic through components is in "-First commit" commit
2. Fetch logic through action creators is in "-Action creators" commit
