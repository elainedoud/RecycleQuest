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
        user = User.find_by(id: params[:id])
        point = user.points.create(point_params)
        render json: point
    end

    def addpointsbytype
        user = User.find_by(id: params[:id])
        points_type = user.points.last&.points_type
        if points_type == 'daily_bonus'
            user.last_daily_bonus = Time.now
            user.total_points_count += Point.points_count
        elsif points_type == 'daily_questions'
            user.last_gem_bonus = Time.now
            user.total_points_count += Point.points_count
        end 
        point = user.points.create(point_params)
        render json: point
    end
    
    def create
        point = Point.new(point_params)
        render json: point
    end

    def point_params
        params.permit(:user_id, :points_type, :points_count, :date)
    end

    def points_type_params(points_type)
        case points_type
        when :daily_bonus, :daily_questions, :location_redemption, :recycle_redemption
            params.permit(:points_type)
        end
    end


   
end