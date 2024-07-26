# Amazon-clone
**MERN satck application**
This is a full stack application which is built using **MERN** stack. This includes User registartion, user login, authentication, product details page and Cart page. To access all the functionalities in the application, the user should be logged in or it shows an error that user should be logged in. That means to add items to cart, the user should be logged in. I used **Json Web Tokens (JWT)** for user authentication/authorization and **redux** for state management. Also used Sweetalerts to show the alert messages.

Below is the interface of the Amazon clone


**Interface before Login**
![image](https://github.com/user-attachments/assets/dcc40ea4-13c4-4842-a4fd-949e0d2306ad)
![image](https://github.com/user-attachments/assets/85d65816-e0ce-4335-9355-ccbc513a6078)
![image](https://github.com/user-attachments/assets/271b39ff-78d0-4d12-a99e-d6316149e72c)




**Signup page**

![image](https://github.com/user-attachments/assets/3d605c05-8bf9-41d6-bfcd-04998f84cf7a)



**Login page**

![image](https://github.com/user-attachments/assets/d15e2df0-e2cb-4fb8-9a1a-b3e07d8d8b0a)

**Login successful**

![image](https://github.com/user-attachments/assets/3272e386-f66b-4391-b7cf-b991360a1d1f)



**Interface after login** (A small letter appears on the profile image at top right corner, that is the first letter of the person name)
Once the user is logged in successfully, then the token and users first name are stored in the local storage.

![image](https://github.com/user-attachments/assets/9cf1ccc4-0304-4b4a-a4fd-c03d1ae3c817)




**Product detail page** (User can only add item to cart if he is logged in)
You can aslo search for a particular product using the search bar. on the top.

![image](https://github.com/user-attachments/assets/1e90deac-3fd0-4e84-b73b-f296ab324ff0)




**Cart page** (Cart count gets updated dynamically based on the number of items in cart)
Clicking on delete removes the item from the cart. Even price value is updated dynamically based on the items in the cart.

![image](https://github.com/user-attachments/assets/8b55ae39-4cdf-4fd2-bb05-5d83e4c35f82)



**Logout** (click on the porfile image letter and click logout to logout)

![image](https://github.com/user-attachments/assets/15031b48-e35d-41ba-8c04-a83cac0b13d2)

