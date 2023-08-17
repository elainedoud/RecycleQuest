class PointsController < ApplicationController

    def index
        points = Point.all 
        render json: points
    end
    #Points#index pulls an array of all the separate "points".  It has amounts of points,
    # username id, question id, ect.

    def points_users
        points_users = User.all
        render json: points_users
    end

    #An array of all users, including usernames, passwords, and date of birth

    def user_points
        user_points = Point.select(:user_id, 'COUNT(user_id)').group(:user_id)
        render json: user_points
    end
  #This is creating an object of arrays that contains each user_id (ie 1) and count of points
    # but it does not take into account that each point has an amount of 2
  # Since change was made to Point model, can we select by username?
    
    def assign_points
        if Question(:answer) == true
            point = Point.create(point_params)
        end
    end
    #Will likely need to experiment with assign_points method to make sure
    #it's working as expected

    def create
        point = Point.new(point_params)
        render json: point
    end

    def point_params
        params.permit(:user_id, :question_id, :amount)
    end

end
