describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const Entries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(Entries).toEqual(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry'); 
    await entries[0].click();
    await page.waitForNavigation();
    expect(page.url()).toMatch('/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const title = await page.$eval('h1', (first) => first.textContent);

    expect(title).toEqual('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
      const entry = await page.$$('journal-entry'); 
      const content = await entry[0].getProperty('entry');
      const json = await content.jsonValue();
      expect(json.title).toEqual('You like jazz?');
      expect(json.date).toEqual('4/25/2021');
      expect(json.content).toEqual("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
      expect(json.image.src).toEqual('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
      expect(json.image.alt).toEqual('bee with sunglasses');
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const Body = await page.$eval('body', body => body.className);
    expect(Body).toEqual('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    expect(page.url()).toMatch("/#settings");
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const title = await page.$eval('header > h1', (first) => first.textContent);

    expect(title).toEqual('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const setPage = await page.$eval('body', () => {
      return document.body.className;
    });
    expect(setPage).toEqual('settings');
  });


  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toMatch("/#entry1");
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    expect(page.url()).toMatch('');
  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user is on the homepage, the header title should be “Journal Entries”', async() => {
    const title = await page.$eval('header > h1', (first) => first.textContent);
    expect(title).toEqual('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async () => {
    const home = await page.evaluate(() => {
      return document.body.className;
    });
    expect(home).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    await page.$$eval("journal-entry", entries => {entries[1].click()});
    expect(page.url()).toEqual('http://127.0.0.1:5500/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    const title = await page.$eval("header > h1", (first) => first.textContent);
    expect(title).toBe("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: When clicking on the second entry, entry page contents is correct', async() => {
   const entry = await page.$$('journal-entry'); 
   const content = await entry[1].getProperty('entry');
   const json = await content.jsonValue();
   expect(json.title).toEqual('Run, Forrest! Run!');
   expect(json.date).toEqual('4/26/2021');
   expect(json.content).toEqual("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
   expect(json.image.src).toEqual('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
   expect(json.image.alt).toEqual('forrest running');
  }, 10000);

  // create your own test 17
  it('Test17: Verify the entry page contents is correct when clicking on the sixth entry', async() => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'I am... Iron Man',
          date: '4/30/2021',
          content: "Big man in a suit of armour. Take that off, what are you? Genius, billionaire, playboy, philanthropist.",
          image: {
            src: 'https://i.ytimg.com/vi/gAZKhM4OWXQ/maxresdefault.jpg',
            alt: 'captain america face to face with iron man'
          }
        }
      */
      const entry = await page.$$('journal-entry'); 
      const content = await entry[5].getProperty('entry');
      const json = await content.jsonValue();
      expect(json.title).toEqual('I am... Iron Man');
      expect(json.date).toEqual('4/30/2021');
      expect(json.content).toEqual("Big man in a suit of armour. Take that off, what are you? Genius, billionaire, playboy, philanthropist.");
      expect(json.image.src).toEqual('https://i.ytimg.com/vi/gAZKhM4OWXQ/maxresdefault.jpg');
      expect(json.image.alt).toEqual('captain america face to face with iron man');
  });

  // create your own test 18
  it('Test18: When click on back then click on forward, URL should be Entry #2', async() => {
      await page.goBack();
      await page.goForward();
      expect(page.url()).toEqual('http://127.0.0.1:5500/#entry2');
  });

  // create your own test 19
  it('Test19: When click on fifth entry, url is correct', async() => {
    await page.goBack();
    const entries = await page.$$('journal-entry');
    await entries[4].click();
    await page.waitForNavigation();
    expect(page.url()).toEqual('http://127.0.0.1:5500/#entry5');
  }, 10000);

  // create your own test 20
  it('Test20: When click on fifth entry, title is correct', async() => {
    const header = await page.$eval("header > h1", (entry) => {
      return entry.innerHTML;
    });
    expect(header).toEqual("Entry 5");
  });
});
