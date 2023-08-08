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
        location = Location.new(location_params)
        render json: location, status: :created
    end

    def location_params
        params.permit(:name, :address_1, :address_2, :recyclable_items)
    end

end
