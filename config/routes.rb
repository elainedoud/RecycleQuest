Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  get '/oneknowledge', to: "knowledges#index"
  get '/allknowledge', to: "knowledges#show_all"

  get '/onelocation', to: "locations#index"
  get '/alllocations', to: "locations#show_all" #Returns all location entries
  post '/newlocation', to: "locations#create" #To create a new location on fronted

  post '/assignpoints', to: "points#assign_points"
  get '/allpoints', to: "points#index"
  post '/addpoints', to: "points#addpoints"
  post '/addpointsbytype', to: "points#addpointsbytype"

  get '/question', to: "questions#index"
  get '/allquestions', to: "questions#show_all"

  get '/user', to: "users#show"
  get '/allusers', to: "users#show_all"
  post '/newuser', to: "users#create"
  get '/leaderboard', to: "users#leaderboard"

  get '/userlogs', to: "users#show_recyclelogs"
  post '/newlog', to: "recyclelogs#newlog"
  get '/logs', to: "recyclelogs#index"

end
