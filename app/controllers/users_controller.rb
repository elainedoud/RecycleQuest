class UsersController < ApplicationController

    def index
        user = User.find(params[:id])
        render json: user
    end

    def show
        user = User.find_by!(id: session[:user_id])
        render json: user
    end

    def show_all
        users = User.all
        render json: users
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def user_params
        params.permit(:username, :password, :emailaddress, :dateofbirt)
    end
    
end
