Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  get '/oneknowledge', to: "knowledges#index"
  get '/allknowledge', to: "knowledges#show_all"

  get '/onelocation', to: "locations#index"
  get '/alllocations', to: "locations#show_all"

  post '/assignpoints', to: "points#assign_points"
  get '/userpoints', to: "points#user_points"
  get '/allpoints', to: "points#index"

  get '/question', to: "questions#index"
  get '/allquestions', to: "questions#show_all"

  get '/user', to: "users#index"
  get '/allusers', to: "users#show_all"
  post '/newuser', to: "users#create"


end
