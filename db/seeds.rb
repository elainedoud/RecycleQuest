# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding data"

first_knowledge = Knowledge.create(y: 450, x: 500, character_name: "Oliver Puddlebrook", knowledge_blurb: "Oliver Puddlebrook says: 'Clean aluminum cans and rinsed glass bottles can always be recycled.'")
second_knowledge = Knowledge.create(y: 1250, x: 490, character_name: "Felix Whimsy", knowledge_blurb: "Felix Whimsy says: 'Paper, including junk mail, can almost always be recycled. The only exceptions are shredded paper or paper that is contaminated (ie. food waste).'")
third_knowledge = Knowledge.create(y: 1180, x: 2735, character_name: "Penelope Puzzle", knowledge_blurb: "Penelope Puzzle says: 'Recycling guidelines and rules are often determined by local laws and ordinances, so it's important to familiarize yourself with local recycling regulations.'")
fourth_knowledge = Knowledge.create(y: 3520, x: 2245, character_name: "Amelia Starshine", knowledge_blurb: "Amelia Starshine says: 'Each ton of paper that is recycled saves seventeen trees.' ")
fifth_knowledge = Knowledge.create(y: 3050, x: 480, character_name: "Simon Feathers", knowledge_blurb: "Simon Feathers says: 'When in doubt, do not recycle an item that you are unsure of.  This could contaminate the other items in the recycling bin.' ")
#sixth_knowledge = Knowledge.create(character_name: "Jasper Fluttery", knowledge_blurb: "The recycling symbol on the bottom of a plastic item specifies the type of plastic.  You will want to check local ordinances to determine if your town or city recycles that number.")
#seventh_knowledge = Knowledge.create(character_name: "Leo Starwhisper", knowledge_blurb:"Cereal boxes can be recycled as long as your local ordinance accepts cardboard. In contrast, pizza boxes are rarely recyclable, because of food contamination and since some pizza boxes are not pure cardboard.' ")

first_question = Question.create(query: "Which of the following can be recycled?", A: "plastic wrap", B: "dirty diaper", C: "rinsed aluminum soda can", answer: "C")
second_question = Question.create(query: "Which of the following can be recycled?", A: "wax coated cup", B: "junk mail", C: "holiday lights", answer: "B")
third_question = Question.create(query: "Why is it important to learn your local area's recycling regulations?", A: "rules change every 5 years", B: "what is recycled often varies by town, city, and municipality", C: "so you can enforce the rules", answer: "B")
fourth_question = Question.create(query: "Each ton of recycled paper saves approximately how many trees?", A: "seventeen", B: "three", C: "ten", answer: "A")
fifth_question = Question.create(query: "What should you do with your glass recyclables", A: "rinse them before recycling", B: "they cannot be recycled", C: "mix them with cardboard and paper", answer: "A")
sixth_question = Question.create(query: "Which of the following can be recycled?", A: "plastic bag", B: "toothpaste tub", C: "glass bottle", answer: "C")
seventh_question = Question.create(query: "If I am in doubt about recycling an item, should I just toss it in the recycle bin?", A:"of course", B: "no, an inappropriate item can contaminate other items", C: "yes, this is best practice", answer: "B")
eighth_question = Question.create(query: "What type of paper should I not put in my recycle bin?", A: "shredded paper", B: "construction paper", C: "envelope", answer: "A")
ninth_question = Question.create(query: "What does the number in the recycling symbol on the bottom of a plastic item mean?", A: "serial batch", B: "nothing", C: "it specifies the type of plastic; check local ordinances to confirm if your town recycles that number", answer: "C")
tenth_question = Question.create(query: "Which of the following can be recycled?", A: "plastic straw", B: "cereal box", C: "light bulbs", answer: "B")

first_user = User.create(username: "isabella_mercer", password: "123", emailaddress: "catmomma@gmail.com", dateofbirth: "10-17-1990")
second_user = User.create(username: "keeganharrington3", password: "123", emailaddress: "keegan3@me.com", dateofbirth: "03-04-1987")
third_user = User.create(username: "liamdonovan", password: "123", emailaddress: "donovanbooks98@aol.com", dateofbirth: "12-12-1998")
fourth_user = User.create(username: "noah_sinclair", password: "123", emailaddress: "noahsinclair@gmail.com", dateofbirth: "05-23-1995")
fifth_user = User.create(username: "avamontgomery", password: "123", emailaddress: "avamusiclover@yahoo.com", dateofbirth: "11-8-2002")

one_point = Point.create(user: first_user, question: first_question, amount: 2)
two_point= Point.create(user: first_user, question: second_question, amount: 2)
three_point= Point.create(user: first_user, question: third_question, amount: 2)
four_point= Point.create(user: first_user, question: fourth_question, amount: 2)
five_point= Point.create(user: first_user, question: fifth_question, amount: 2)
six_point= Point.create(user: second_user, question: sixth_question, amount: 2)
seven_point= Point.create(user: second_user, question: seventh_question, amount: 2)
eight_point= Point.create(user: third_user, question: eighth_question, amount: 2)
nine_point= Point.create(user: third_user, question: ninth_question, amount: 2)
ten_point= Point.create(user: third_user, question: tenth_question, amount: 2)
eleven_point= Point.create(user: second_user, question: first_question, amount: 2)
twelve_point= Point.create(user: second_user, question: second_question, amount: 2)
thirteen_point= Point.create(user: second_user, question: third_question, amount: 2)
fourteen_point= Point.create(user: third_user, question: fourth_question, amount: 2)
fifteen_point= Point.create(user: third_user, question: fifth_question, amount: 2)
sixteen_point= Point.create(user: fourth_user, question: sixth_question, amount: 2)
seventeen_point= Point.create(user: fourth_user, question: seventh_question, amount: 2)
eighteen_point= Point.create(user: fourth_user, question: eighth_question, amount: 2)
nineteen_point= Point.create(user: fourth_user, question: ninth_question, amount: 2)
twenty_point= Point.create(user: fourth_user, question: tenth_question, amount: 2)
twentyone_point= Point.create(user: fifth_user, question: first_question, amount: 2)
twentytwo_point= Point.create(user: fifth_user, question: second_question, amount: 2)
twentythree_point= Point.create(user: fifth_user, question: third_question, amount: 2)
twentyfour_point= Point.create(user: fifth_user, question: fourth_question, amount: 2)
twentyfive_point= Point.create(user: fifth_user, question: fifth_question, amount: 2)
twentysix_point= Point.create(user: first_user, question: sixth_question, amount: 2)
twentyseven_point= Point.create(user: third_user, question: seventh_question, amount: 2)
twentyeight_point= Point.create(user: second_user, question: eighth_question, amount: 2)


puts "Done seeding"