Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "pages#index"

  get "/chictower", to: "pages#chictower"
  get "/jumeriah", to: "pages#jumeriah"
  get "/thankyou", to: "pages#thankyou"
  get "/peninsula", to: "pages#peninsula"
  get "/home2", to: "pages#home2"
  get "/home2form", to: "pages#home2form"
  post "/submit_lead", to: "pages#submit_lead"
  get "/download_brocher", to: "pages#download_brocher"
end
