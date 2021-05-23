# Lab8_Starter
Author: Zhongkang Fang  

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
    1)Within a Github action that runs whenever code is pushed 
 
2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   No, we should not use a unit test for this one for the "message" feature because it contains several parts/features/components. Unit test should be use on one component testing. There are too many cases to account for. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
Yes, using a unit test to test "max message length" is good. It is like one simple component/features that can be tested whenever the code is pushed. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   We would run the tests without a browser UI. 

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
  Click on settings before each test case,instead of using URL, we can use await page.click('header > img');

