task :default => :build

desc 'Clean up generated site'
task :clean do
  cleanup
end

desc 'Test site output for Liquid template errors'
task :test => :build do
  errors = `grep --exclude Rakefile -R 'Liquid error:' _site`
  if errors.nil? || errors.empty?
    puts "No errors"
  else
    puts "Errors:"
    puts errors.inspect
    exit 1
  end
end

desc 'Build site with Jekyll'
task :build => :clean do
  submodule('update')
  jekyll('build')
end

desc 'Start server with --auto'
task :server => :clean do
  jekyll('serve --watch --config _config.yml,_config_local.yml')
end

desc 'Build and deploy'
task :deploy => :build do
  user = 'kemayo'
  host = 'davidlynch.org'
  directory = '~/web/davidlynch.org/public_html/'
  sh "rsync -rtOzh --progress --delete --exclude=/.well-known _site/ #{user}@#{host}:#{directory}"
end

desc 'Make a new post'
task :post, [:name, :date] do |t, args|
  if args.name then
    template(args.name, args.date)
  else
    puts "Name required"
  end
end

def template(name, date)
  require 'date'
  if date.is_a?(String)
    date = DateTime.parse(date)
  else
    date = DateTime.now
  end
  contents = "" # otherwise using it below will be badly scoped
  File.open("_posts/yyyy-mm-dd-template.markdown", "rb") do |f|
    contents = f.read
  end
  contents = contents.sub("%date%", date.strftime("%Y-%m-%d %H:%M:%S %z")).sub("%title%", name)
  filename = "_posts/" + date.strftime("%Y-%m-%d-") + name.downcase.gsub( /[^a-zA-Z0-9_\.]/, '-') + '.markdown'
  if File.exist? filename then
    puts "Post already exists: #{filename}"
    return
  end
  File.open(filename, "wb") do |f|
    f.write contents
  end
  puts "created #{filename}"
end

def cleanup
  sh 'rm -rf _site'
end

def jekyll(opts = '')
  sh 'jekyll ' + opts
end

def submodule(opts = '')
  sh 'git submodule ' + opts
end
