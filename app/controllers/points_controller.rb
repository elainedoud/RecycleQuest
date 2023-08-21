class PointsController < ApplicationController

    def index
        points = Point.all 
        render json: points
    end
    #Points#index pulls an array of all the separate "points".  It has amounts of points,
    # username id, question id, ect.
    
    def assign_points
        if Question(:answer) == true
            point = Point.create(point_params)
        end
    end
    #Will likely need to experiment with assign_points method to make sure
    #it's working as expected

    def addpoints
        user = User.find_by(username: params[:username])
        point = Point.create(:user_id = user.id, :points_type = points_type_params[:points_type], :points_count)
        render json: point
    end

    def addpointsbytype
        user = User.find_by(username: params[:username])
        if points_type == daily_bonus
            User.last_daily_bonus == Time.now
            User.total_points_count += points_count
            point = Point.create(:user_id = user.id, :points_type = points_type_params[:points_type], :points_count)
        elsif points_type == daily_questions
            User.last_gem_bonus == Time.now
            User.total_points_count += points_count
            point = Point.create(:user_id = user.id, :points_type = points_type_params[:points_type], :points_count)
        elsif points_type == location_redemption
            point = Point.create(:user_id = user.id, :points_type = points_type_params[:points_type], :points_count)
        elsif points_type == recycle_redemption
            point = point = Point.create(:user_id = user.id, :points_type = points_type_params[:points_type], :points_count)
        end 
    end
    

    def create
        point = Point.new(point_params)
        render json: point
    end

    def point_params
        params.permit(:user_id, :points_type, :points_count, :date)
    end

    def points_type_params
        params.permit(:daily_bonus, :daily_questions, :location_redemption, :recycle_redemption)
    end
end
