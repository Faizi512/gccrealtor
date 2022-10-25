Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "pages#index"

  get "/chictower", to: "pages#chictower"
  get "/jumeriah", to: "pages#jumeriah"
  get "/thankyou", to: "pages#thankyou"
  get "/peninsula", to: "pages#peninsula"
end
