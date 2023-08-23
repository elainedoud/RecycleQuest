class LocationsController < ApplicationController

    def index
        location = Location.find(params[:id])
        render json: location
    end

    def show_all
        locations = Location.all
        render json: locations
    end

    def create 
        location = Location.create(location_params)
        render json: location, status: :created
    end

    def location_params
        params.permit(:name, :address_1, :address_2, :accepted_recyclables, :created_by, :zipcode)
    end

end
