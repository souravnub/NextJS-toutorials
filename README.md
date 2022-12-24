# Next JS Toutorials

This Repo is the record for all the learnings that I came across while learning nextJs from **codeWithHarry**

## Learnings

1. **NEXT HEAD :** This is a utility component that is provided by next to us. Using this componenet we can inject anything into the <head> of the page.

```js Example
import Head from "next/head";
<Head>
    <title>Hello</title>
</Head>;
```

the above code will set the title of the page to **_Hello_**

-   script tags can also be added here. Example if we want to add specific script into the page then we can import next head into that page and then can import the required script into that page.
-   meta tags can be added in next Head component
-   favicon can also be set from here for individual page

2. **SCRIPT COMPONENT :** This is a component that helps us to import any script into our project. _It is not used inside the Head component_. It also enables us to lazyload the scripts that we import from external sources.
   _more info :_[NextJS script component](https://nextjs.org/docs/basic-features/script).

3.**IMAGE COMPONENT :** NextJS also provides an Image component that helps us to make our images more optimmized and web friendly.
_more info :_ [NextJS Image component](https://nextjs.org/docs/api-reference/next/image)
