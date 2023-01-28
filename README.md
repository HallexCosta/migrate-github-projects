## Migrate Projects

Automation to easy migrate items (issues, pull request and draft issues) of a Project A to another Project B.
  
> Project was tinked in facilitate migrate your a classic project (or beta project) from github to another Project. I made this project with purpose to migrate a old classic project to new beta project of github that has a new design with new features, but I didn't want to do the manual work of moving card by card :joy:  

![working](https://user-images.githubusercontent.com/55293671/183350107-2607c755-969d-4420-be85-9f3734b40286.png?width=50)

#### Envrioments

```env
# Personal token to authenticate your github account
GH_AUTH=
# Your login from github account
GH_LOGIN=
```

#### How to use?

```sh
# Clone project
$ gh repo clone hallexcosta/migrate-projects-github

# Access directory
$ cd migrate-projects-gituhb/

# Compile to ts code
$ yarn build

# Run project
$ yarn start
````
