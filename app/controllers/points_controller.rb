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
        point = user.points.create(point_params)
        points_type = point.points_type
        #points_type = user.points.last&.points_type
        if points_type == 'daily_bonus'
            user.last_daily_bonus = Time.now
        elsif points_type == 'daily_questions'
            user.last_daily_question = Time.now 
        elsif points_type == 'daily_gem'
            user.last_gem_bonus = Time.now
        end 
        if user.points.last&.points_count != nil
        user.total_points_count += point.points_count
        end
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
        when :daily_bonus, :daily_questions, :location_redemption, :recycle_redemption, :daily_gem
            params.permit(:points_type)
        end
    end

   # def format_date
    #    if Point.first.date != nil
    #    date = Point.first.date
   #     formatted_date = date.strftime("%Y-%m-%d")
    #    render json: formatted_date
   #     end 
 #   end


   
end