# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_21_170223) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "knowledges", force: :cascade do |t|
    t.string "character_name"
    t.string "knowledge_blurb"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "y"
    t.integer "x"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "address_1"
    t.string "address_2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "accepted_recyclables"
    t.string "created_by"
    t.string "zipcode"
  end

  create_table "points", force: :cascade do |t|
    t.integer "user_id"
    t.integer "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "points_type"
    t.integer "points_count"
    t.date "date"
  end

  create_table "questions", force: :cascade do |t|
    t.string "query"
    t.string "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "A"
    t.string "B"
    t.string "C"
  end

  create_table "recyclelogs", force: :cascade do |t|
    t.integer "user_id"
    t.date "date"
    t.integer "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.string "emailaddress"
    t.date "dateofbirth"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_points_count"
    t.datetime "last_gem_bonus"
    t.datetime "last_daily_bonus"
  end

end
