class UsersController < ApplicationController

    def index
        user = User.find(params[:id])
        render json: user
    end

    def show_all
        users = User.all
        render json: users
    end

    def create
        user = User.new(user_params)
        render json: user, status: :created
    end

    def user_params
        params.permit(:username, :password, :emailaddress, :dateofbirt)
    end
    
end
