class LocationsSerializer < ActiveModel::Serializer
  attributes :id, :name, :address_1, :address_2, :accepted_recyclables, :created_by, :zipcode
end
