# React intern Take-a-home assessment

Hey there, glad you made this far. The task at hand is a take-a-home assessment which you'll have to complete as per the instructions given to you via mail or any other form of contact.


So here is the scenario,

### Scenario

Your grandmother has dimentia and she has a lot of delicious recipe she wanted to save before she forgets everything. So she being a `senior` react developer (pun intended) decided to create an app to store all her recipes. But unfortunately she wasn't agile enough, and forgot how to code. So you being the ambitious grandchild with react skills at hand is tasked to fix the app for her.

### Architecture

- **Home page**
  - The home page of the app is where the recipes are listed
  - Each card shows an overview of a recipe, upon clicked it shows the whole content
  - You can delete or archive recipes

- **Create page**
  - In create page you have a form to upload recipes

- **archive page**
  - here archived recipes appear which can be unarchived or deleted

---
  This is the intended application pretty straight forward for the sake of not making it complicated, you can keep the data in the memory.

## Missing features

> You are tasked to complete the said features

1. **Create new recipe**, should be able to add new recipes with following information like `Recipe title, Description, Ingredient list` you can find the data in the source code and the data types. The feature is half done you'll have to implement the rest.
2. **Delete feature**, should have the ability to delete each recipe from the home page
3. **Search**, when the data gets larger it need to be queried.
4. **Pagination** , you don't want the entire data all at once so paginate
5. **Archives**, The archive should be a page itself, accessed via nav bar. Archivall should happen from home page, unarchive and deletion must be implemented
6. **Popups,alerts,fallbacks** are needed to be added as per need, which you have to identify.

NOTE:

- You can add more features but try not to over complicate like for example :
 `` Using an ai agent that adds recipe which is connected to grandma's IOT wearable mic gets feedback from microphone attached to it while grandma lists all the recipe out``.
 We don't need that. Just keep it simple.

 - Good Design is appreciated like colors , use of components , stylings etc,... still keep it simple.

---

 ## Instruction regarding submission

 1. Fork this repo and use the fork to complete the task at hand.
 2. `npm i` to install all the packages. You should have latest react and node installed.
 3. We have used few third-party libraries to set the project up. So we encourage you to use it. 
 

 | Library | Purpose | links
|----------|---------|------|
Zustand|State management| [docs](https://zustand.docs.pmnd.rs/getting-started/introduction)|
|React hook forms| forms| [docs](https://react-hook-form.com/)|
|Zod|form Validation|[docs](https://zod.dev/)|
|tailwind css|styling|[docs](tailwindcss.com/docs/installation/using-vite)|
Shadcn UI| Component Library|[docs](https://ui.shadcn.com/docs)|
React router| Routing and navigation| [docs](https://reactrouter.com/)

Making use of these libraries are encouraged.
There are dependency libraries you could make use of and those should be avoided.



4. After task completion **create a screen record** of explaining features you have implemented and walking through it.


 ### Important
- In the repo you'll find a folder named ``component/ui`` do not edit it as it holds all the shadcn components.
- `main` branch will be used for evaluation so don't forget to keep the branch updated.

All the best!! Make your grandma proud.