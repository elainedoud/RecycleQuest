class PointsController < ApplicationController

    def index
        points = Point.all 
        render json: points
    end
    
    def assign_points
        if Question(:answer) == true
            point = Point.create(point_params)
        end
    end

    def addpoints
        user = User.find(params[:id])
        point = user.points.create(point_params)
        render json: point
    end

    def addpointsbytype
        user = User.find(params[:id])
        if user
            point = user.points.create!(point_params)
            if point.valid?
                user.total_points_count += point.points_count
                user.save
                render json: point
              else
                render json: { error: "Point not valid" }, status: :unprocessable_entity
              end
          else
            render json: { error: "User not found" }, status: :not_found
        end
    end


    def create
        point = Point.create(point_params)
        render json: point
    end

    def point_params
        params.permit(:points_type, :points_count, :date)
    end

    def points_type_params(points_type)
        case points_type
        when :daily_bonus, :daily_questions, :location_redemption, :recycle_redemption, :daily_gem
            params.permit(:points_type)
        end
    end


   
end