class UsersSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :emailaddress, :dateofbirth

  has_many :points
  has_many :questions, through: :points

end
