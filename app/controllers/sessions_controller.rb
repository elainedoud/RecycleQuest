class SessionsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unauthorized

    def create
        user = User.find_by(username: params[:username])
        user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user 
    end

    def destroy
        session.delete :user_id
        render json: {message: "You've been logged out"}
    end


end
