class RecyclelogsSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :date, :amount

  belongs_to :user
end
