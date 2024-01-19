const router = require('express').Router();
// Here is where we provide hardcoded data to render dynamically
const articles = [
  {
    title_name:
      "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    article_content:
      "ATOMIC HABITS starts from a simple but powerful question: How can we live better? We know that good habits allow us to significantly improve our lives, but we often deviate from the path: we stop exercising, we eat poorly, we sleep little, we waste. Why is it so easy to fall into bad habits and so difficult to follow good ones? James Clear gives us fantastic ideas based on scientific research, which allow him to reveal how we can transform small daily habits to change our lives and improve it. This guide reveals the hidden forces that shape our behavior—from our mindset to environment to genetics—and shows us how to apply each change to our lives and work. After reading this book, you will have a simple method for developing an effective system that will lead to success. Learn how to… Give yourself time to develop new habits Overcome a lack of motivation and willpower Design an environment so that success is easy to achieve Get back on track when you've gotten a little off track.",
  },
  {
    title_name: "Diana Nyad: Never, ever give up | TED Talk",
    article_content:
      "In the jet black night, stung by jellyfish, drowning in the salt water, singing to herself, hallucinating... Diana Nyad just kept swimming. And this is how he finally achieved the goal of his life as an athlete: an extreme 160-kilometer swim from Havana to Florida... at the age of 64. Listen to his story.",
  },
  {
    title_name: "The Subtle Art of Not Giving a F*ck",
    article_content:
      "For decades, we have been told that positive thinking is the key to a happy and rich life. Fuck positivity, says Mark Manson. Let's be honest, shit is fucked and we have to live with it. On his popular Internet blog, Manson does not sugarcoat or speak ambiguously. He tells it like it is, a dose of raw, refreshing and honest truth that is missing today. The Subtle Art of Not Giving a F**k is your antidote to the pampering, feel-good mentality that has infected modern society and ruined a generation, rewarding them with gold medals just for showing up.",
  },
  {
    title_name: "The brain-changing benefits of exercise",
    article_content:
      "What's the most transformative thing that you can do for your brain today? Exercise! says neuroscientist Wendy Suzuki. Get inspired to go to the gym as Suzuki discusses the science of how working out boosts your mood and memory -- and protects your brain against neurodegenerative diseases like Alzheimer's.",
  },
];

//get all dishes
router.get('/article', async (req, res) => {
  res.render('all');
});

//get one dish
router.get('/article/:num', async (req, res) => {
  // This method renders the 'dish' template, and uses params to select the correct dish to render in the template, based on the id of the dish.
  return res.render('article', articles[req.params.num - 1]);
});

module.exports = router;